export type EnergyGrid = {
  "address": "64N1Mk3qkNjY9m5xmaKF2oDojFR5aERgGWcFHuqtHtjo",
  "metadata": {
    "name": "energy_grid",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "add_active_time",
      "discriminator": [
        249,
        33,
        226,
        5,
        84,
        171,
        48,
        255
      ],
      "accounts": [
        {
          "name": "energy_device",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "time_seconds",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "energy_device",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "const",
                "value": [
                  95
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "output_power_w",
          "type": "f64"
        },
        {
          "name": "capacity_kwh",
          "type": "f64"
        },
        {
          "name": "latitude",
          "type": "f32"
        },
        {
          "name": "longitude",
          "type": "f32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "EnergyDevice",
      "discriminator": [
        192,
        157,
        118,
        111,
        80,
        123,
        60,
        13
      ]
    }
  ],
  "types": [
    {
      "name": "EnergyDevice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "active_until",
            "type": "i64"
          },
          {
            "name": "output_power_w",
            "type": "f64"
          },
          {
            "name": "capacity_kwh",
            "type": "f64"
          },
          {
            "name": "latitude",
            "type": "f32"
          },
          {
            "name": "longitude",
            "type": "f32"
          }
        ]
      }
    }
  ]
}

export const IDL: EnergyGrid = {
  "address": "64N1Mk3qkNjY9m5xmaKF2oDojFR5aERgGWcFHuqtHtjo",
  "metadata": {
    "name": "energy_grid",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "add_active_time",
      "discriminator": [
        249,
        33,
        226,
        5,
        84,
        171,
        48,
        255
      ],
      "accounts": [
        {
          "name": "energy_device",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "time_seconds",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "energy_device",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "const",
                "value": [
                  95
                ]
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "output_power_w",
          "type": "f64"
        },
        {
          "name": "capacity_kwh",
          "type": "f64"
        },
        {
          "name": "latitude",
          "type": "f32"
        },
        {
          "name": "longitude",
          "type": "f32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "EnergyDevice",
      "discriminator": [
        192,
        157,
        118,
        111,
        80,
        123,
        60,
        13
      ]
    }
  ],
  "types": [
    {
      "name": "EnergyDevice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "active_until",
            "type": "i64"
          },
          {
            "name": "output_power_w",
            "type": "f64"
          },
          {
            "name": "capacity_kwh",
            "type": "f64"
          },
          {
            "name": "latitude",
            "type": "f32"
          },
          {
            "name": "longitude",
            "type": "f32"
          }
        ]
      }
    }
  ]
}