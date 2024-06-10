use anchor_lang::prelude::*;

declare_id!("64N1Mk3qkNjY9m5xmaKF2oDojFR5aERgGWcFHuqtHtjo");

#[program]
pub mod energy_grid {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        name: String,
        output_power_w: f64,
        capacity_kwh: f64,
        latitude: f32,
        longitude: f32,
    ) -> Result<()> {
        ctx.accounts.energy_device.name = name;
        ctx.accounts.energy_device.active_until = 0;
        ctx.accounts.energy_device.output_power_w = output_power_w;
        ctx.accounts.energy_device.capacity_kwh = capacity_kwh;
        ctx.accounts.energy_device.latitude = latitude;
        ctx.accounts.energy_device.longitude = longitude;

        Ok(())
    }

    pub fn modify(
        ctx: Context<Modify>,
        name: Option<String>,
        active_until: Option<i64>,
        output_power_w: Option<f64>,
        capacity_kwh: Option<f64>,
        latitude: Option<f32>,
        longitude: Option<f32>,
    ) -> Result<()> {
        if let Some(device_name) = name {
            ctx.accounts.energy_device.name = device_name;
        }

        if let Some(device_active_until) = active_until {
            ctx.accounts.energy_device.active_until = device_active_until;
        }

        if let Some(device_output_power) = output_power_w {
            ctx.accounts.energy_device.output_power_w = device_output_power;
        }

        if let Some(device_capacity) = capacity_kwh {
            ctx.accounts.energy_device.capacity_kwh = device_capacity;
        }

        if let Some(device_latitude) = latitude {
            ctx.accounts.energy_device.latitude = device_latitude;
        }

        if let Some(device_longitude) = longitude {
            ctx.accounts.energy_device.longitude = device_longitude;
        }

        Ok(())
    }

    pub fn add_active_time(ctx: Context<Modify>, time_seconds: u64) -> Result<()> {
        let clock = Clock::get()?;
        if ctx.accounts.energy_device.active_until < clock.unix_timestamp {
            ctx.accounts.energy_device.active_until = clock.unix_timestamp;
        }

        ctx.accounts.energy_device.active_until += time_seconds as i64;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + EnergyDevice::MAX_SIZE,
        seeds = [
            authority.key.as_ref(),
            b"_",
            name.as_ref()
        ],
        bump
    )]
    pub energy_device: Account<'info, EnergyDevice>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Modify<'info> {
    #[account(mut)]
    pub energy_device: Account<'info, EnergyDevice>,

    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
pub struct EnergyDevice {
    pub name: String,
    pub active_until: i64,
    pub output_power_w: f64,
    pub capacity_kwh: f64,
    pub latitude: f32,
    pub longitude: f32,
}

impl EnergyDevice {
    pub const MAX_SIZE: usize = (4 + 32) + 8 + 8 + 8 + 4 + 4;
}
