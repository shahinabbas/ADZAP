# # class Solution:
# #     def merge(self, nums1,nums2):
# #         nums1=nums1+nums2
# #         for i in range(len(nums1)-1):
# #             if nums1[i]==0:
# #                 nums1.remove(nums1[i])
# #         return nums1

                        
# # s = Solution()
# # res = s.merge([1,2,3,0,0,0],[2,5,6])
# # print(res)
# // import React from "react";
# // import { useSelector } from "react-redux";
# // import { Link, Navigate, useNavigate } from "react-router-dom";
# // import { Flex, Box, Text, HStack, Heading, Spacer } from "@chakra-ui/react";
# // import Signup from "./Signup";
# // import Login from "./Login";
# // function Navbar() {
# //   const isAuthenticated = useSelector(
# //     (state) => state.user_details.name !== null
# //   );
# //   const userName = useSelector((state) => state.user_details.name);

# //   const navigate = useNavigate();
# //   return (
# //     <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
# //       {" "}
# //       <Flex as="nav" bg="blue" alignItems="center" h="75px" bgColor="#5C59EC">
# //         <Heading
# //           as="h1"
# //           style={{ cursor: "pointer" }}
# //           onClick={() => navigate("/")}
# //         >
# //           ADZAP
# //         </Heading>
# //         <Link to="/post">Post</Link>
# //         <Spacer />
# //         <Login />
# //         <Signup />
# //         <HStack spacing="20px" marginLeft="0">
# //           <Box bg="black" p="10px">
# //             {isAuthenticated ? userName[0].toUpperCase() : "M"}
# //           </Box>
# //           <Text>{isAuthenticated ? userName : "user"}</Text>
# //         </HStack>
# //       </Flex>
# //     </div>
# //   );
# // }

# // export default Navbar;