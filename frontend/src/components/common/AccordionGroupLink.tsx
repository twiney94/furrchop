import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, Heading, Link } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";


type AccordionGroupLinkProps = {
  title: string;
  children : Array<ReactNode>;
};

export const AccordionGroupLink:FC<AccordionGroupLinkProps> = ({children, title}) => {

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton className="p-0" style={{padding:0}}>
        <Box as="span" flex='1' textAlign='left' className="chakra-link">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} className="flex flex-col">
    {children}
    </AccordionPanel>
  </AccordionItem>
</Accordion>
  );
};

export default AccordionGroupLink;
