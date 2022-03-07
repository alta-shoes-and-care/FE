const initialState = [
  {
    title: "Reguler Cleaning",
    price: 25000,
    image: "https://www.thespruce.com/thmb/NuFOlvnclSdD92adneqIHjhgBC8=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/remove-salt-stains-from-shoes-clothes-2147178-01-5616c76b4c2941f0963e00d83e2e16e5.jpg",
    description: "Special washing treatment for shoes in detail for all parts, safe for all materials and colors. Done manually so it is safe for all types of shoes. Safe for all materials and shoe colors because it uses natural materials and the right technique. Parts treated: upper, insole,  outsole. Processing time +- 3 days."
  },
  {
    title: "Reguler Express",
    price: 35000,
    image: "https://img.choice.com.au/-/media/00c68840ab71451a9ea64b767b979479.ashx?w=760",
    description: "Special washing treatment for shoes in detail for all parts, safe for all materials and colors. Done manually so it is safe for all types of shoes. Safe for all materials and shoe colors because it uses natural materials and the right technique. Parts treated: upper, insole, outsole. Processing time +- 5 hours."
  },
  {
    title: "Premium Cleaning",
    price: 50000,
    image: "https://electroluxattackcare.id/wp-content/uploads/2018/07/Nggak-Nyangka-Ternyata-Sneakers-Bisa-Dicuci-dengan-Mesin-Cuci-Lho.jpg",
    description: "Special washing treatment for shoes in detail for all parts, safe for all materials and colors. Done manually so it is safe for all types of shoes. Safe for all materials and shoe colors because it uses natural materials and the right technique. Parts treated: upper, midsole, outsole, insole, laces. Processing time +- 3 days."
  },
  {
    title: "Premium Express",
    price: 70000,
    image: "https://www.thespruce.com/thmb/eIq65FLwHUFUZtz6C-TlEte6mKY=/434x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-your-shoes-4164257-11-46261f03249848278067ce33de8369e2.jpg",
    description: "Special washing treatment for shoes in detail for all parts, safe for all materials and colors. Done manually so it is safe for all types of shoes. Safe for all materials and shoe colors because it uses natural materials and the right technique. Parts treated: upper, midsole, outsole, insole, laces. Processing time +- 5 hours."
  },
  {
    title: "Repaint Medium",
    price: 100000,
    image: "https://okdiario.com/img/2019/10/12/como-limpiar-zapatos-de-gamuza-en-diez-pasos-620x349.jpg",
    description: "Done manually and in detail so it is safe for shoes. Safe for shoes because it uses special dyes for the midsole and the correct technique. Colors can be requested as desired by asking our team directly. Parts treated: upper. Processing time +- 5 days."
  },
  {
    title: "Repaint Hard",
    price: 200000,
    image: "https://activedetergent.com/wp-content/uploads/2019/05/hand-washing-nike-shoes-600x374.png",
    description: "Done manually and in detail so it is safe for shoes. Safe for shoes because it uses special dyes for the midsole and the correct technique. Colors can be requested as desired by asking our team directly. Parts treated: midsole, outsole, upper. Processing time +- 5 days."
  },
  {
    title: "Repair Medium",
    price: 200000,
    image: "https://www.thespruce.com/thmb/s_cejokpl5rA67s1APaSutEhXTA=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-wash-tennis-athletic-shoes-2147002-02-a8d1968dd31f4935bb605146c201b1fe.JPG",
    description: "Treatment of reuniting the loose part of the shoe by sewing. Using a special strong thread, it is more durable. The stitching results are neat, so the shoes remain comfortable and good when viewed. Parts treated: midsole, outsole, upper. Processing time +- 2 days."
  },
  {
    title: "Repair Hard",
    price: 300000,
    image: "https://www.thespruce.com/thmb/SOk0Ti4JWNPCFdItlRo3rmGuvpA=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-clean-desert-combat-boots-2145726-7-b78e32f425ad49c4bf1bbce354bb028c.jpg",
    description: "Treatment of reuniting the loose part of the shoe by means of glue.nUsing a special strong glue, it is more durable. For maximum glue results we also use a press. Parts treated: midsole, outsole, upper. Processing time +- 2 days."
  },
]

const getServiceReducer = (state = initialState, action) => {
  if (action.type == "SET_LIST_SERVICE") {
    if(Array.isArray(action.payload)) return action.payload;
  }

  return state;
};

export default getServiceReducer;