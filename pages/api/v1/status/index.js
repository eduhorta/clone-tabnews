function status(request, response) {
  response.status(200).json({ chave: "são acima" });
}

export default status;
