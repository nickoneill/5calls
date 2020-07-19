import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Postcards } from './index';
import { Layout } from '../layout';

interface Props extends RouteComponentProps<{ id: string }> {}

const PostcardsPage: React.StatelessComponent<Props> = (props: Props) => (
  <Layout>
    <Postcards />
  </Layout>
);

export default withRouter(PostcardsPage);
