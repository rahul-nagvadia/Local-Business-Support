import React from "react";
import "../Styles/Card.css"; // Import CSS for card styling
import { FaHandshake } from "react-icons/fa";
import { MdOutlineManageSearch } from "react-icons/md";
import { SlPeople } from "react-icons/sl";

const Card = ({ argument }) => {
  let heading, content, icon,msg;

  // Define different headings and content based on the argument
  switch (argument) {
    case 1:
      msg = "Connecting";
      icon = <FaHandshake size={30} />;
      heading = "Connect with Local Customers";
      content =
        "Build relationships with your local community by connecting with potential customers nearby. Increase visibility and grow your business by reaching out to locals in your area.";
      break;
    case 2:
      msg = "Helping Customer";
      icon = <SlPeople size={30} />;
      heading = "Easiness in Finding  Local  Shops";
      content =
        "Elevate the customer experience by simplifying the search for local businesses. With our assistance, customers can quickly locate and access the shops they desire, resulting in a seamless and satisfying shopping journey.";
      break;
    case 3:
      msg = "Managing Stocks"
      icon = <MdOutlineManageSearch size={30} />;
      heading = "Empowering Businesses with Stock Management";
      content =
        "Equip businesses with efficient stock management capabilities. Our solution provides intuitive tools and resources that enable businesses to streamline their inventory management processes, ensuring optimal stock levels and minimizing shortages.";
      break;
  }

  return (
    <div className="card">
      <div className="content-ofthecard">
        <div className="back">
          <div className="back-content">
            <svg
              stroke="#ffffff"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              height="50px"
              width="50px"
              fill="#ffffff"
            >
              {/* SVG path */}
            </svg>
            <div className="icon-i-needed">{icon}</div>

            <strong>{msg}</strong>
          </div>
        </div>
        <div className="front">
          <div className="front-content">
            <h3>{heading}</h3>
            <p className="scrollable-content">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
