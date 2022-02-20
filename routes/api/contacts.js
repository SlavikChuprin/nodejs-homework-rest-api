const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { validateBody } = require("../../middlewares/validation");
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("./contacts-validation-shemes");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.post("/", validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json({ status: "success", code: 201, payload: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.put(
  "/:contactId",
  validateBody(schemaUpdateContact),
  async (req, res, next) => {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({ status: "success", code: 200, payload: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  }
);

module.exports = router;
