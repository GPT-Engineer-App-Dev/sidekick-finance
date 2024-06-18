import React, { useState } from "react";
import { Container, VStack, HStack, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "Expense", brand: "Nike" },
    { id: 2, date: "2023-10-05", amount: 150, type: "Income", brand: "Adidas" },
  ]);

  const [form, setForm] = useState({ date: "", amount: "", type: "", brand: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    if (isEditing) {
      setTransactions(transactions.map((t) => (t.id === editId ? { ...form, id: editId } : t)));
      setIsEditing(false);
      setEditId(null);
    } else {
      setTransactions([...transactions, { ...form, id: transactions.length + 1 }]);
    }
    setForm({ date: "", amount: "", type: "", brand: "" });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setForm(transaction);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Accounting App</Text>
        <HStack spacing={4} width="100%">
          <Input name="date" placeholder="Date" value={form.date} onChange={handleChange} />
          <Input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
          <Select name="type" placeholder="Type" value={form.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
          <Select name="brand" placeholder="Brand" value={form.brand} onChange={handleChange}>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
          <Button onClick={handleAdd}>{isEditing ? "Update" : "Add"}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Brand</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.brand}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEdit(transaction.id)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDelete(transaction.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;