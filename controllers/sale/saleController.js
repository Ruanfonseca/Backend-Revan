const Sale = require("../../models/Sale");
const Property = require("../../models/Property");

exports.createSale = async (req, res) => {
  try {
    const [saleData, propertyData] = req.body;
    saleData.id = Math.floor(Math.random() * 9_000_000) + 1_000_000;
    const property = await Property.findByPk(propertyData.id);
    if (!property) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }

    const sale = await Sale.create({
      ...saleData,
      propertyId: property.id,
    });

    res.status(201).json({
      message: "Venda criada com sucesso",
      sale,
      property,
    });
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    res.status(400).json({
      error: "Erro ao criar venda",
      details: error.message,
    });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    console.error("Erro ao listar vendas:", error);
    res.status(500).json({ error: "Erro ao listar vendas" });
  }
};
