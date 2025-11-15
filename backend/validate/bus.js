export const create = (req, res, next) => {
    let data = req.body;
    
    if (!data?.cityFrom || !data?.cityTo || !data?.departureTime || !data?.arrivalTime || !data?.totalSeats || !data?.poName || !data?.seat || !data?.price || !data?.policy || !data?.boarding || !data?.arrival) {
        return res.json({
            success: false,
            message: "Please provide all required fields",
        });
    }
    if (data.price <= 0) {
        return res.json({
            success: false,
            message: "Price must be greater than 0",
        });
    }
    if (data.totalSeats <= 0) {
        return res.json({
            success: false,
            message: "Total seats must be greater than 0",
        });
    }
    if (!Array.isArray(data.seat) || data.seat.length === 0) {
        return res.json({
            success: false,
            message: "Seat must be a non-empty",
        });
    }
    next()
}