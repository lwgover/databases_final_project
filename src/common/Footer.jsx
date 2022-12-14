function Footer () {
    const year = new Date().getFullYear();
  
    return <footer>{`Copyright © University of Puget Sound ${year}`}</footer>;
};
  
export default Footer;