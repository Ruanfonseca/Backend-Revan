const Property = require("../../models/Property");
const Reports = require("../../models/Reports");
const Views = require("../../models/views");

const { fn, col, literal } = require("sequelize");

exports.getReports = async (res) => {
  try {
    // Total de propriedades (todas)
    const totalProperties = await Property.count();

    // Soma de todos os valores (todas as propriedades)
    const totalRevenueResult = await Property.findOne({
      attributes: [[fn("SUM", col("priceValue")), "totalRevenue"]],
      raw: true,
    });
    const totalRevenue = Number(totalRevenueResult.totalRevenue || 0);

    // Propriedades vendidas
    const soldCount = await Property.count({ where: { status: "vendido" } });

    // Soma do valor das vendidas
    const soldRevenueResult = await Property.findOne({
      attributes: [[fn("SUM", col("priceValue")), "soldRevenue"]],
      where: { status: "vendido" },
      raw: true,
    });
    const soldRevenue = Number(soldRevenueResult.soldRevenue || 0);

    // Ticket médio considerando apenas vendidas
    const mediumTicket = soldCount > 0 ? soldRevenue / soldCount : 0;

    // Cria o objeto no formato do model Reports
    const reportData = {
      totalProperties,
      sellerProperties: soldCount,
      totalRevenue,
      mediumTicket,
    };

    // Se quiser salvar no banco:
    const newReport = await Reports.create(reportData);

    res.json(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar relatório" });
  }
};

exports.getGeneralVision = async (req, res) => {
  try {
    // Busca contagem agrupada por status
    const results = await Property.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      group: ["status"],
      raw: true,
    });

    // Garantir que todos os status existam no retorno, mesmo que 0
    const vision = {
      disponivel: 0,
      reservado: 0,
      alugado: 0,
      vendido: 0,
    };

    results.forEach((row) => {
      vision[row.status] = Number(row.count);
    });

    res.json(vision);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar visão geral" });
  }
};

exports.getNeighborhoodSeller = async (req, res) => {
  try {
    const results = await Property.findAll({
      attributes: ["location", [fn("COUNT", col("id")), "salesCount"]],
      where: {
        status: "vendido",
        location: { [Property.sequelize.Op.ne]: null }, // ignora nulls
      },
      group: ["location"],
      order: [[fn("COUNT", col("id")), "DESC"]],
      raw: true,
    });

    // Retorna o array ordenado de bairros e quantidade de vendas
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar bairros vendedores" });
  }
};

exports.getSeller = async (req, res) => {
  try {
    // Agrupar vendas por ano e mês, somando o valor
    const salesByMonth = await Seller.findAll({
      attributes: [
        // Formata ano-mês no formato YYYY-MM
        [fn("DATE_FORMAT", col("createdAt"), "%Y-%m"), "yearMonth"],
        [fn("SUM", col("value")), "totalValue"],
        [fn("COUNT", col("id")), "salesCount"],
      ],
      group: ["yearMonth"],
      order: [["yearMonth", "ASC"]],
      raw: true,
    });

    res.json(salesByMonth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar vendas agrupadas por mês" });
  }
};

exports.getView = async (req, res) => {
  try {
    const viewsByMonth = await Views.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("createdAt"), "%Y-%m"), "yearMonth"],
        [fn("SUM", col("qtd")), "totalViews"],
        [fn("COUNT", col("id")), "viewCount"], // opcional: número de registros no mês
      ],
      group: ["yearMonth"],
      order: [["yearMonth", "ASC"]],
      raw: true,
    });

    res.json(viewsByMonth);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erro ao buscar visualizações agrupadas por mês" });
  }
};

exports.addView = async (req, res) => {
  try {
    const { qtd } = req.body;

    if (typeof qtd !== "number" || qtd <= 0) {
      return res
        .status(400)
        .json({ error: "Quantidade (qtd) deve ser um número positivo" });
    }

    const newView = await Views.create({ qtd });

    res.status(201).json({
      message: "Visualização adicionada com sucesso",
      view: newView,
    });
  } catch (error) {
    console.error("Erro ao adicionar visualização:", error);
    res.status(500).json({ error: "Erro ao adicionar visualização" });
  }
};
