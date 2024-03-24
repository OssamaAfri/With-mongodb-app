import Head from 'next/head';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger = () => {
  return (
    <div>
      <Head>
        <title>API Documentation</title>
      </Head>
      <SwaggerUI url="/api/doc" />
    </div>
  );
};

export default Swagger;
