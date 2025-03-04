const displayMadCurrency = (num) => {
    const formatter = new Intl.NumberFormat('fr-MA',{
        style: 'currency',
        currency: 'MAD',
        minimumFractionDigits : 2
    })
    return formatter.format(num)
}
export default displayMadCurrency