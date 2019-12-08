import fromPairs from 'lodash/fromPairs';
import { StaticQuery, graphql } from 'gatsby';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Flavors extends Component {
  render() {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Flavor</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          <StaticQuery
            query={graphql`
              query FlavorsQuery {
                allDatabaseXml(
                  filter: { name: { eq: "AllAvailableIngredients" } }
                ) {
                  edges {
                    node {
                      name
                      xmlChildren {
                        name
                        children {
                          name
                          content
                        }
                      }
                    }
                  }
                }
              }
            `}
            render={data => {
              const [
                {
                  node: { xmlChildren: ingredients }
                }
              ] = data.allDatabaseXml.edges;

              const transformedIngredients = ingredients.map(ingredient => {
                const properties = [];

                for (const {
                  name: key,
                  content: value
                } of ingredient.children) {
                  properties.push([key, value]);
                }

                return fromPairs(properties);
              });

              return transformedIngredients.map(ingredient => (
                <tr
                  key={`${ingredient.IngredientType}${ingredient.Vendor}${ingredient.Name}`}
                >
                  <td>{ingredient.Vendor}</td>
                  <td>{ingredient.Name}</td>
                  <td>{ingredient.AmountInInventory} ml</td>
                </tr>
              ));
            }}
          />
        </tbody>
      </Table>
    );
  }
}
