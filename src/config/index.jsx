export const signUpFormControls = [
  {
    id: "firstname",
    label: "First Name",
    placeholder: "Enter your first name...",
    componentType: "input",
    type: "text",
  },
  {
    id: "lastname",
    label: "Last Name",
    placeholder: "Enter your last name...",
    componentType: "input",
    type: "text",
  },
  {
    id: "username",
    label: "Username",
    placeholder: "Enter your username...",
    componentType: "input",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password...",
    componentType: "input",
    type: "password",
  },
];

export const signInFormControls = [
  {
    id: "username",
    label: "Username",
    placeholder: "Enter your username...",
    componentType: "input",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password...",
    componentType: "input",
    type: "password",
  },
];

export const productsFormControls = [
  {
    id: "productimg",
    label: "Product Image:",
    placeholder: "Upload your product image...",
    componentType: "input",
    type: "file",
  },
  {
    id: "productname",
    label: "Product Name:",
    placeholder: "Enter the name of your product...",
    componentType: "input",
    type: "text",
  },
  {
    id: "productrate",
    label: "Product Rate:",
    placeholder: "Enter the rate of your product...",
    componentType: "input",
    type: "number",
  },
  {
    id: "productdescription",
    label: "Product Description:",
    placeholder: "Enter the description of your product...",
    componentType: "textarea",
    type: "text",
  },
];

export const profileFormControls = [
  {
    id: "profileimg",
    label: "Profile Image:",
    placeholder: "Upload your profile image...",
    componentType: "input",
    type: "file",
  },
  {
    id: "email",
    label: "Your Email:",
    placeholder: "Ex :- abc@gmail.com",
    componentType: "input",
    type: "email",
  },
  {
    id: "phone",
    label: "Your Phone:",
    placeholder: "Ex :- 9874864498",
    componentType: "input",
    type: "tel",
  },
  {
    id: "address",
    label: "Your Address:",
    placeholder: "Ex :- 123, ABC Street, XYZ City",
    componentType: "textarea",
    type: "text",
  }
]

export const orderFormControls = [
  {
    id: "quantity",
    label: "Quantity",
    componentType: "select",
    options: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
      { id: "5", label: "5" },
    ],
  }
]

export const orderPageFormControls = [
  {
    id: "note",
    label: "Note",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter your note...",
  },
  {
    id: "status",
    label: "Status",
    componentType: "select",
    options: [
      { id: "pending", label: "Pending" },
      { id: "processing", label: "Processing" },
      { id: "shipped", label: "Shipped" },
      { id: "out_for_delivery", label: "Out for Delivery" },
      { id: "delivered", label: "Delivered" },
    ]
  }
]