import { Avatar, Flex, HStack,Text, IconButton, Tooltip } from "@chakra-ui/react";


function CustomTooltip({ label, icon, ...rest }) {
  return (
    <Tooltip
      shouldWrapChildren
      label={label}
      bg="#eae6df"
      color="black"
      fontSize="xs"
      {...rest}
    >
      <IconButton variant="ghost">{icon}</IconButton>
    </Tooltip>
  );
}

export function Header(props) {
  return (
    <Flex
      bg="#f0f2f5"
      justify="space-between"
      py="2"
      px="4"
      borderRight="1px solid #f2f2f2"
      color="#54656f"
      {...props}
    >
      <Avatar
        boxSize="40px"
        name="Clara Fiona"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJsYWNrJTIwZmVtYWxlJTIwaGVhZHNob3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />
      <Text>User</Text>
    </Flex>
  );
}
