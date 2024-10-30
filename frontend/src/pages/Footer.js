import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#4caf50', padding: '20px 0', color: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">
              Phone: +234 123 4567 890 <br />
              Email: info@nasagro.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Link href="/" color="inherit">Home</Link><br />
            <Link href="/services" color="inherit">Services</Link><br />
            <Link href="/contact" color="inherit">Contact</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit">Facebook</Link><br />
              <Link href="#" color="inherit">Twitter</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
