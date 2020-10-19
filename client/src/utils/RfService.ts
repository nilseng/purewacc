export const getRiskFreeRates = async () => {
    const res = await fetch("/risk-free-rates")
    return res.json()
}