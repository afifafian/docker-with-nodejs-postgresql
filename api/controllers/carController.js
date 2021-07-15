const CarService = require("../services/carService");
const CarResponse = require("../dto/response/car/carResponse");

class CarControllers {
  static async get(req, res, next) {
    try {
      const fetchCars = await CarService.findAll();

      const data = fetchCars.map(car => {
        const response = new CarResponse();
        response.setCarResponse(car);
        return response;
      });

      return res.status(200).json({
        message: "Successfully fetch cars data!",
        results: data,
        request: {
          type: "GET",
          url: "/cars"
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async detail(req, res, next) {
    try {
      const car_id = req.params.carID;

      const getDetailCar = await CarService.detail(car_id);

      const response = new CarResponse();
      response.setCarResponse(getDetailCar);

      return res.status(200).json({
        message: "Successfully fetch detail car!",
        result: response,
        request: {
          type: "GET",
          url: `/cars/${car_id}`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const carData = req.body;

      const createNewCar = await CarService.create(carData);

      return res.status(201).json({
        message: `Successfully create new Car!`,
        data: createNewCar,
        request: {
          type: "POST",
          url: `/cars`
        }
      });

    } catch (err) {
      next(err)
    }
  }

}

module.exports = CarControllers;
