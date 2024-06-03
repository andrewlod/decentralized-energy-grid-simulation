use anchor_lang::prelude::*;

declare_id!("64N1Mk3qkNjY9m5xmaKF2oDojFR5aERgGWcFHuqtHtjo");

#[program]
pub mod energy_grid {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
