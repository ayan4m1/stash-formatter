import React from 'react';

import Flavors from '~components/flavors';
import Layout from '~components/layout';
import SEO from '~components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Flavors />
  </Layout>
);

export default IndexPage;
