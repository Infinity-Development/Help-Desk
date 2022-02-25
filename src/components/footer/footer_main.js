import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./footer_style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
  
const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "#7289DA", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        Infinity Bot List
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Useful Info</Heading>
            <FooterLink href="https://infinitybots.gg/about">About Us</FooterLink>
            <FooterLink href="https://infinitybots.gg/queue">Bot Queue</FooterLink>
            <FooterLink href="https://status.botlist.site">Status Page</FooterLink>
          </Column>
          <Column>
            <Heading>Legal Info</Heading>
            <FooterLink href="https://infinitybots.gg/terms">Terms of Service</FooterLink>
            <FooterLink href="https://infinitybots.gg/privacy">Privacy Policy</FooterLink>
            <FooterLink href="https://www.dmca.com/Protection/Status.aspx?ID=6bfe1403-c4b3-45a4-921f-1359a6215327&refurl=https://infinitybots.gg/">DMCA Status</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="mailto:support@infinitybots.gg">Support Team</FooterLink>
            <FooterLink href="mailto:social@infinitybots.gg">Social Team</FooterLink>
            <FooterLink href="mailto:legal@infinitybots.gg">Legal Team</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://infinitybots.gg/discord">
            <FontAwesomeIcon icon={faDiscord} />
                <span style={{ marginLeft: "10px" }}>
                  Discord
                </span>
            </FooterLink>
            <FooterLink href="https://twitter.com/InfinityBotList">
            <FontAwesomeIcon icon={faTwitter} />
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
            </FooterLink>
            <FooterLink href="https://github.com/InfinityBotList">
              <FontAwesomeIcon icon={faGithub} />
                <span style={{ marginLeft: "10px" }}>
                  Github
                </span>
            </FooterLink>
          </Column>
        </Row>
        <br /><br />
        <center>
          <p>&copy; 2022 <a href="https://infinitybots.gg">Infinity Bot List</a> | All Rights Reserved</p>
        </center>
      </Container>
    </Box>
  );
};
export default Footer;