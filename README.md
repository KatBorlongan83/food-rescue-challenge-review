# Food Rescue Dispatcher

Your job is to write a dispatch strategy for moving surplus food to organizations that can use it.

The starter kit gives you a scenario with food donors, recipient organizations, and volunteers. You write your solution in `challenge.js`. Then run the test command to see whether the plan is valid and how it scores.

## What you are trying to do

Rescue as many meals as possible before pickup deadlines.

A good plan should:

- collect available food before it expires;
- avoid giving an organization more food than it can handle;
- use volunteers who are available at the right time;
- stay within vehicle capacity;
- use refrigerated vehicles when food needs refrigeration;
- serve multiple organizations where possible.

## Getting started

You need Node.js and `make`.

```bash
make dev
make test
```

`make dev` creates a mock scenario with solution and saves it at:

```text
workspace/scenario.json
```

`make test` runs your solution from `challenge.js`, checks the returned plan, and prints its score.


## Your solution

Edit `challenge.js` and implement `solveScenario`.

It receives a scenario object and must return a plan with an `assignments` array.

```js
function solveScenario(scenario) {
  return {
    assignments: [
      {
        donorId: "donor-1",
        recipientId: "recipient-2",
        volunteerId: "volunteer-1",
        meals: 20,
        pickupMinute: 30,
        deliveryMinute: 60
      }
    ]
  };
}
```

The empty plan is valid, but it earns no points:

```js
function solveScenario(scenario) {
  return { assignments: [] };
}
```

## Scenario data

Each generated scenario includes three lists.

### Donors

A donor has food available for pickup.

```js
{
  id: "donor-1",
  mealsAvailable: 80,
  pickupDeadlineMinute: 180,
  refrigerated: false,
  latitude: 40.7128,
  longitude: -74.006
}
```

- `mealsAvailable` is the maximum number of meals that can be collected.
- `pickupDeadlineMinute` is the latest allowed pickup time.
- `refrigerated` means the food needs a refrigerated vehicle.

### Recipients

A recipient is an organization that can receive food.

```js
{
  id: "recipient-1",
  mealCapacity: 250,
  latitude: 40.7306,
  longitude: -73.9866
}
```

- `mealCapacity` is the maximum number of meals the organization can receive.

### Volunteers

Volunteers provide a vehicle and are available for part of the day.

```js
{
  id: "volunteer-1",
  vehicleCapacity: 100,
  availableFromMinute: 0,
  availableUntilMinute: 360,
  refrigerated: true
}
```

- `vehicleCapacity` is the maximum number of meals for one assignment.
- `availableFromMinute` and `availableUntilMinute` define when the volunteer can work.
- `refrigerated` shows whether the vehicle can carry refrigerated food.

## Assignment format

Every assignment in your returned plan needs these fields:

```js
{
  donorId: "donor-1",
  recipientId: "recipient-1",
  volunteerId: "volunteer-1",
  meals: 40,
  pickupMinute: 45,
  deliveryMinute: 75
}
```

## Rules

A plan is invalid if any assignment breaks a rule.

For each assignment:

- the donor, recipient, and volunteer IDs must exist;
- `meals` must be greater than zero;
- the donor cannot provide more than `mealsAvailable`;
- the recipient cannot receive more than `mealCapacity`;
- `meals` cannot be greater than the volunteer's `vehicleCapacity`;
- pickup must happen on or before `pickupDeadlineMinute`;
- pickup and delivery must be within the volunteer's available time;
- delivery cannot be before pickup;
- refrigerated food must use a refrigerated volunteer vehicle.

If a plan has any violations, its score is `0`. The test output lists the violations so you can fix them.

## Scoring

Valid plans are scored like this:

```text
score = (rescued meals × 10) + (recipient organizations served × 50)
```

For example, delivering 120 meals to 3 organizations scores:

```text
(120 × 10) + (3 × 50) = 1350
```

## Practice scenarios

Scenarios are generated from a seed and difficulty setting.

```bash
SEED=42 DIFFICULTY=bronze make dev
SEED=42 DIFFICULTY=silver make dev
SEED=99 DIFFICULTY=gold make dev
```

Using the same seed and difficulty creates the same scenario again. That makes it easier to compare different versions of your strategy.

Available difficulty levels:

| Level | What it includes |
|---|---|
| `bronze` | Donors, recipients, meal counts, and deadlines |
| `silver` | Volunteer availability, vehicle capacity, and refrigeration |
| `gold` | Tighter deadlines and more refrigerated donations |

## Files

```text
challenge.js                         Your solution
mock.js                              Local scenario generator and test runner
workspace/scenario.json              The current generated scenario
workspace/scenario_engine.node       Engine delivering mock up data and expected solutions
```

## Before submitting

Run:

```bash
make test
```

Make sure the output includes:

```text
"valid": true
```

Good luck, and try to rescue as many meals as you can.