import Link from 'next/link'
import {HStack, Text, Button, IconButton, Center, Input} from "@chakra-ui/react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import {HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon} from "@chakra-ui/icons"
import Inputforsearch from './InputForSearch'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
        
        
        
export default function Header(){
    return (
      <>
        <header>
            <HStack justify="space-between" p="1rem" borderBottom="1px" mb="2rem">
              <Link href="/">
                <a>
                  <Text>GameWithMe</Text>
                </a>
              </Link>
              <HStack>
                
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<HamburgerIcon />}
                  variant='outline'
                />
                <MenuList>
                  <MenuItem icon={<AddIcon />} command='⌘T'>
                    New Tab
                  </MenuItem>
                  <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                    New Window
                  </MenuItem>
                  <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                    Open Closed Tab
                  </MenuItem>
                        <Link href="/profile">
                            <a>
                            <MenuItem icon={<EditIcon />}>
                                Profile
                            </MenuItem>
                            </a>
                        </Link>
                </MenuList>
              </Menu>
              </HStack>
            </HStack>
        </header>
        </>
    )
        

}     