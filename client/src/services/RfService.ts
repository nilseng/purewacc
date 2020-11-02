export const getRiskFreeRates = async () => {
    const res = await fetch("/api/risk-free-rates")
    return res.json()
}