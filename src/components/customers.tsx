import { useState } from "react";
import "./customers.css";
import { useQuery, gql } from "@apollo/client";

interface Customer {
    email: string;
    id: string;
    name: string;
    role: string;
    __typename: string;
  }
  interface RoleMapping {
    [key: string]: string;
  }
function CustomersList() {
  const [selectedRole, setSelectedRole] = useState("ADMIN");

  const Query = gql`
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

  const { data, loading } = useQuery(Query);
  if (loading) {
    return <h1>Loading</h1>;
  }
  const items = data.listZellerCustomers.items;
  const roleMapping:RoleMapping = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    // Add more role mappings as needed
  };

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  const filteredCustomers = selectedRole
    ? items.filter((customer: Customer) => customer.role === selectedRole)
    : items;
    const displayRole = roleMapping[selectedRole]
  return (
    <div>
      <h2>User Types</h2>
      <div className="input-type">
        <div>
          <input
            type="radio"
            id="admin"
            name="userType"
            value="ADMIN"
            checked={selectedRole === "ADMIN"}
            onChange={handleRoleChange}
          />{" "}
          <label htmlFor="admin">Admin</label>
        </div>
        <br />
        <div>
          <input
            type="radio"
            id="manager"
            name="userType"
            value="MANAGER"
            checked={selectedRole === "MANAGER"}
            onChange={handleRoleChange}
          />{" "}
          <label htmlFor="manager">Manager</label>
        </div>
        <hr />
      </div>
      <div>
        <h2>{displayRole} Users</h2>
        <div>
          {filteredCustomers.map((item: Customer, index: number) => (
            <div key={index}>
              <div className="users">
                <div className="first-letter">
                  <span>{item.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="userDetails">
                  <h3>{item.name}</h3>
                  <h5>{item.role}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomersList;