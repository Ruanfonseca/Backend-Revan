const Property = require("../../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const data = { ...req.body };
    data.id = Math.floor(Math.random() * 9_000_000) + 1_000_000;
    delete data.createdAt;
    delete data.updatedAt;

    const property = await Property.create(data);

    res.status(201).json({
      message: "Propriedade criada com sucesso",
      property,
    });
  } catch (error) {
    console.error("Erro ao criar propriedade:", error);
    res
      .status(400)
      .json({ error: "Erro ao criar propriedade", details: error.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Erro ao listar propriedades:", error);
    res.status(500).json({ error: "Erro ao listar propriedades" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: "Propriedade não encontrada" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Erro ao buscar propriedade:", error);
    res.status(500).json({ error: "Erro ao buscar propriedade" });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca a propriedade antes da atualização
    const propertyBefore = await Property.findByPk(id);
    if (!propertyBefore) {
      return res.status(404).json({ error: "Propriedade não encontrada" });
    }

    // Atualiza a propriedade
    const [updated] = await Property.update(req.body, { where: { id } });

    if (updated === 0) {
      return res
        .status(404)
        .json({ error: "Propriedade não encontrada para atualização" });
    }

    // Busca a propriedade atualizada
    const updatedProperty = await Property.findByPk(id);

    // Verifica se o status mudou para 'vendido'
    if (
      propertyBefore.status !== "vendido" &&
      updatedProperty.status === "vendido"
    ) {
      // Cria registro na tabela Seller com o valor do imóvel
      await Seller.create({
        value: updatedProperty.priceValue,
      });
    }

    res.status(200).json({
      message: "Propriedade atualizada com sucesso",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Erro ao atualizar propriedade:", error);
    res
      .status(400)
      .json({ error: "Erro ao atualizar propriedade", details: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Property.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res
        .status(404)
        .json({ error: "Propriedade não encontrada para exclusão" });
    }

    res.status(200).json({ message: "Propriedade deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar propriedade:", error);
    res.status(500).json({ error: "Erro ao deletar propriedade" });
  }
};
