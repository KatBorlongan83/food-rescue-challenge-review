"use strict";

/**
 * Create a plan for the given scenario.
 *
 * The result must have this shape:
 *
 * {
 *   assignments: [
 *     {
 *       donorId: "donor-1",
 *       recipientId: "recipient-1",
 *       volunteerId: "volunteer-1",
 *       meals: 25,
 *       pickupMinute: 30,
 *       deliveryMinute: 60
 *     }
 *   ]
 * }
 *
 * @param {object} scenario
 * @param {object[]} scenario.donors
 * @param {object[]} scenario.recipients
 * @param {object[]} scenario.volunteers
 * @returns {{ assignments: object[] }}
 */
function solveScenario(scenario) {
  // TODO: Replace this with your dispatch strategy.
  //
  // Helpful donor fields:
  // - id
  // - mealsAvailable
  // - pickupDeadlineMinute
  // - refrigerated
  //
  // Helpful recipient fields:
  // - id
  // - mealCapacity
  //
  // Helpful volunteer fields:
  // - id
  // - vehicleCapacity
  // - availableFromMinute
  // - availableUntilMinute
  // - refrigerated
  //
  // An empty plan is valid but scores zero.
  return {
    assignments: []
  };
}

module.exports = {
  solveScenario
};