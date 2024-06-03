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
        longitude: f32
    ) -> Result<()> {
        ctx.accounts.energy_device.name = name;
        ctx.accounts.energy_device.is_active = false;
        ctx.accounts.energy_device.output_power_w = output_power_w;
        ctx.accounts.energy_device.capacity_kwh = capacity_kwh;
        ctx.accounts.energy_device.latitude = latitude;
        ctx.accounts.energy_device.longitude = longitude;

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

#[account]
pub struct EnergyDevice {
    pub name: String,
    pub is_active: bool,
    pub output_power_w: f64,
    pub capacity_kwh: f64,
    pub latitude: f32,
    pub longitude: f32
}

impl EnergyDevice {
    pub const MAX_SIZE: usize = (4 + 32) + 1 + 8 + 8 + 4 + 4;
}
