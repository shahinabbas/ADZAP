import {
  Box,
  Flex,
  Avatar,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Tooltip,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ChatList } from "./chat-list";
import { FilterIcon, SearchIcon } from "../../../images/icons";
import { useState } from "react";

export function LeftPanel({onItemClick}) {

  return (
    <Flex direction="column" w="30%" >
      <Box>
        <Flex
          bg="#f0f2f5"
          justify="space-between"
          py="2"
          px="4"
          borderRight="1px solid #f2f2f2"
          color="#54656f"
        >
          <Avatar
            boxSize="40px"
            name="Clara Fiona"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJsYWNrJTIwZmVtYWxlJTIwaGVhZHNob3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          />
          <Text>User</Text>
        </Flex>
        <HStack
          spacing={2}
          px="4"
          py="2"
          borderBottom="1px"
          borderColor="#e2e8f0"
        >
          {/* <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              _placeholder={{
                opacity: 0.6,
                color: "#3b4a54",
                paddingLeft: "24px",
                fontSize: "15px",
              }}
              h="36px"
              _hover={{ bg: "#f0f2f5" }}
              bg="#f0f2f5"
              variant="filled"
              placeholder="Search or start new chat"
            />
          </InputGroup> */}
          {/* <Tooltip
            shouldWrapChildren
            label="Unread chats filter"
            bg="#eae6df"
            color="black"
            fontSize="xs"
          >
            <IconButton>
              <FilterIcon />
            </IconButton>
          </Tooltip> */}
        </HStack>
      </Box>
      <ChatList onItemClick={onItemClick} />
    </Flex>
  );
}
