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
            <th>Flavor</th>
            <th>Brand</th>
            <th>Vendor</th>
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
                          children {
                            name
                            content
                          }
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

                for (const child of ingredient.children) {
                  if (child.name === 'ManEntry') {
                    const nameItem = child.children.find(
                      item => item.name === 'Name'
                    );

                    if (nameItem) {
                      properties.push(['Manufacturer', nameItem.content]);
                    }
                  } else {
                    properties.push([child.name, child.content]);
                  }
                }

                return fromPairs(properties);
              });

              const sortedFlavors = transformedIngredients
                .filter(
                  ingredient =>
                    ingredient.IngredientType === 'Flavor' &&
                    parseInt(ingredient.AmountInInventory, 10) !== 0
                )
                .sort((a, b) => {
                  const compare = a.Name.localeCompare(b.Name);

                  if (compare !== 0) {
                    return compare;
                  }

                  return a.Manufacturer.localeCompare(b.Manufacturer);
                });

              return sortedFlavors.map(flavor => (
                <tr
                  key={`${flavor.Name}${flavor.Manufacturer}${flavor.Vendor}`}
                >
                  <td>{flavor.Name}</td>
                  <td>{flavor.Manufacturer}</td>
                  <td>{flavor.Vendor}</td>
                </tr>
              ));
            }}
          />
        </tbody>
      </Table>
    );
  }
}
