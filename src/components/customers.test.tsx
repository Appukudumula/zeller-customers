import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CustomersList from './customers';
import { gql } from '@apollo/client';

const mockData = {
        "listZellerCustomers": {
            "items": [
                {
                    "email": "lynn@gmail.com",
                    "id": "f47813cf-0482-4326-afc9-12f53218ed06",
                    "name": "Lynn Warr",
                    "role": "MANAGER",
                    "__typename": "ZellerCustomer"
                },
                {
                    "email": "david@gmail.com",
                    "id": "73bae2af-4fa4-4023-8829-1034604e7590",
                    "name": "David Miller",
                    "role": "ADMIN",
                    "__typename": "ZellerCustomer"
                },
                {
                    "email": "ryan@gmail.com",
                    "id": "0c90ecd4-d159-4335-9377-f29ee6829847",
                    "name": "Ryan Muller",
                    "role": "ADMIN",
                    "__typename": "ZellerCustomer"
                },
                {
                    "email": "joe@gmail.com",
                    "id": "edc033b9-ba6c-4857-9ff9-85c52ad39ef9",
                    "name": "Joe Perera",
                    "role": "MANAGER",
                    "__typename": "ZellerCustomer"
                },
                {
                    "email": "cris@gmail.com",
                    "id": "24d34832-7c10-4c91-a582-32a0222125c0",
                    "name": "Chris Miller",
                    "role": "ADMIN",
                    "__typename": "ZellerCustomer"
                }
            ],
            "__typename": "ZellerCustomerConnection"
        } 
}
export const MY_QUERY = gql`
  query ListZellerCustomers {
    listZellerCustomers {
      items {
        email
        id
        name
        role
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: MY_QUERY,
    },
    result: {
      data: mockData,
    },
  },
];

describe('CustomersList', () => {
  it('renders loading message', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomersList />
      </MockedProvider>
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });
  });

  it('filters users based on role', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomersList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('David Miller')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Manager'));

    await waitFor(() => {
       expect(screen.getByText('Lynn Warr')).toBeInTheDocument();
    });
  });
});