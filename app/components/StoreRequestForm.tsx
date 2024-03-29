"use client";
import React, { useState } from "react";
import { postStoreRequest } from "../_utils/serverActions";

import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  Stack,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react";

type item = {
  id: number;
  quantity: number;
  sku: string;
  description: string;
};

function StoreRequstForm() {
  const [requestItems, setRequestItems] = useState<item[]>([
    {
      id: Date.now(),
      quantity: 1,
      sku: "",
      description: "",
    },
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState("store");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");

  function addMoreItems(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setRequestItems([
      ...requestItems,
      { id: Date.now(), quantity: 1, sku: "", description: "" },
    ]);
  }

  function removeSingleItem(
    e: React.MouseEvent<HTMLButtonElement>,
    item: item,
  ) {
    e.preventDefault();
    const newState = requestItems.filter((el, index) => {
      return item.id !== el.id;
    });
    setRequestItems(newState);
  }

  function handleItemChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    index: number,
  ) {
    const newStateArray = requestItems.map((el) => {
      if (el.id === id) {
        return { ...requestItems[index], [e.target.name]: e.target.value };
      } else {
        return el;
      }
    });

    setRequestItems(newStateArray);
  }

  function handleQuantityChange(value: number, id: number, index: number) {
    const newStateArray = requestItems.map((el) => {
      if (el.id === id) {
        return { ...requestItems[index], quantity: value };
      } else {
        return el;
      }
    });
    setRequestItems(newStateArray);
  }

  const dummyRequest = {
    customerName: "billy",
    deliveryMethod: "store",
    items: [
      {
        id: 1,
        sku: "50915003041L",
        description: "not sure what item this is",
        quantity: 5,
      },
    ],
    note: {
      noteText: "hello friends",
      noteAuthor: "Yo mama",
    },
  };

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("subt mit clicked. sending", customerDetails);

    const routeRes = await fetch("/api/store-request", {
      method: "POST",
      body: JSON.stringify(dummyRequest),
    }).then((res) => {
      console.log(res);
      return res.json();
    });
    /*
      .then((res) => {
        console.log(res);
        return JSON.parse(res.body);
      });
      */
    console.log("final res logging from form", routeRes);

    return;
  }

  const customerDetails = {
    name: customerName,
    phone: customerPhone,
    email: customerEmail,
    items: requestItems,
    deliveryMethod: deliveryMethod,
  };
  return (
    <div>
      <div className="landing-background opacity-25" />
      <Box mb={10} ml={6} w={"40%"}>
        <Heading>store request form</Heading>
        <Text fontSize={"2xl"}>
          Hello and welcome to the paddy store request form. Here you will be
          able to make requests to ecomm to post things out direct to your
          customers.
        </Text>
      </Box>
      <form onSubmit={(e) => handleFormSubmit(e)} className="mt-44 mb-44">
        <Container mb={4}>
          <Heading size="md">Customer Details</Heading>
          <FormControl isRequired={true}>
            <FormLabel htmlFor="customerName">Customer Name</FormLabel>
            <Input
              type="text"
              name="customerName"
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
            />
          </FormControl>
          <FormControl isRequired={true}>
            <FormLabel htmlFor="customerPhone">Customer Phone</FormLabel>
            <Input
              type="tel"
              name="customerPhone"
              onChange={(e) => setCustomerPhone(e.target.value)}
              value={customerPhone}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="customerEmail">Customer Email</FormLabel>
            <Input
              type="text"
              name="customerEmail"
              onChange={(e) => setCustomerEmail(e.target.value)}
              value={customerEmail}
            />
          </FormControl>
        </Container>
        <Container>
          <Heading size="md">Item details</Heading>
          <Flex flexDirection="column">
            {requestItems.map((item, index) => (
              <Box mt={2} key={item.id}>
                <Heading size="sm">Item #{index + 1}</Heading>
                <FormControl w={170} flexDirection={"row"}>
                  <HStack>
                    <FormLabel>Quantity</FormLabel>
                    <NumberInput
                      min={1}
                      defaultValue={1}
                      value={item.quantity}
                      onChange={(value) =>
                        handleQuantityChange(
                          Number.parseInt(value),
                          item.id,
                          index,
                        )
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="sku">SKU</FormLabel>
                  <Input
                    type="text"
                    name="sku"
                    value={item.sku}
                    onChange={(e) => handleItemChange(e, item.id, index)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(e, item.id, index)}
                  />
                </FormControl>
                <Button
                  mt="2"
                  onClick={(e) => removeSingleItem(e, item)}
                  size="xs"
                  colorScheme="yellow"
                  isDisabled={requestItems.length === 1 ? true : false}
                >
                  Remove item
                </Button>
              </Box>
            ))}
          </Flex>
          <Center mt={4} mb={4}>
            <Button colorScheme="green" onClick={(e) => addMoreItems(e)}>
              Add more items
            </Button>
          </Center>
        </Container>
        <Container>
          <Heading size="md">Direct to customer or store?</Heading>
          <FormControl isRequired={true}>
            <FormLabel htmlFor="deliveryChooser">
              Where should the product be sent to?
            </FormLabel>
            <RadioGroup
              name="deliveryChooser"
              id="deliveryChooser"
              onChange={(value) => {
                setDeliveryMethod(value);
              }}
            >
              <Stack direction="row">
                <Radio value="store">Store</Radio>
                <Radio value="customerAddress">Customer Address</Radio>
              </Stack>
            </RadioGroup>
            {deliveryMethod === "store" ? (
              <p>Sending product to your store</p>
            ) : (
              <Box>
                <FormLabel htmlFor="customerAddress">
                  Customer Address
                </FormLabel>
                <Textarea
                  name="customerAddress"
                  id="customerAddress"
                  cols={30}
                  rows={5}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  value={customerAddress}
                ></Textarea>
              </Box>
            )}
          </FormControl>
          <Center mt={4} mb={4}>
            <Button size={"lg"} colorScheme="whatsapp" type="submit">
              Send request
            </Button>
          </Center>
        </Container>
      </form>
    </div>
  );
}

export default StoreRequstForm;
