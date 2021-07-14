export const vault_AaveLenderLINKBorrowerSUSDABI = [{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_yVault","type":"address"},{"internalType":"bool","name":"_isWantIncentivised","type":"bool"},{"internalType":"bool","name":"_isInvestmentTokenIncentivised","type":"bool"},{"internalType":"string","name":"_strategyName","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"clone","type":"address"}],"name":"Cloned","type":"event"},{"anonymous":false,"inputs":[],"name":"EmergencyExitEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"loss","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"debtPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"debtOutstanding","type":"uint256"}],"name":"Harvested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"debtThreshold","type":"uint256"}],"name":"UpdatedDebtThreshold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newKeeper","type":"address"}],"name":"UpdatedKeeper","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"delay","type":"uint256"}],"name":"UpdatedMaxReportDelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"metadataURI","type":"string"}],"name":"UpdatedMetadataURI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"delay","type":"uint256"}],"name":"UpdatedMinReportDelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"profitFactor","type":"uint256"}],"name":"UpdatedProfitFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewards","type":"address"}],"name":"UpdatedRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newStrategist","type":"address"}],"name":"UpdatedStrategist","type":"event"},{"inputs":[],"name":"acceptableCostsRay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"apiVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_strategist","type":"address"},{"internalType":"address","name":"_rewards","type":"address"},{"internalType":"address","name":"_keeper","type":"address"},{"internalType":"address","name":"_yVault","type":"address"},{"internalType":"bool","name":"_isWantIncentivised","type":"bool"},{"internalType":"bool","name":"_isInvestmentTokenIncentivised","type":"bool"},{"internalType":"string","name":"_strategyName","type":"string"}],"name":"cloneAaveLenderBorrower","outputs":[{"internalType":"address","name":"newStrategy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"debtThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"delegatedAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyExit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"estimatedTotalAssets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"callCost","type":"uint256"}],"name":"harvestTrigger","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_strategist","type":"address"},{"internalType":"address","name":"_rewards","type":"address"},{"internalType":"address","name":"_keeper","type":"address"},{"internalType":"address","name":"_yVault","type":"address"},{"internalType":"bool","name":"_isWantIncentivised","type":"bool"},{"internalType":"bool","name":"_isInvestmentTokenIncentivised","type":"bool"},{"internalType":"string","name":"_strategyName","type":"string"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isInvestmentTokenIncentivised","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isWantIncentivised","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keeper","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"leaveDebtBehind","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLoss","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxReportDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTotalBorrowIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadataURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newStrategy","type":"address"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minReportDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"profitFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debtThreshold","type":"uint256"}],"name":"setDebtThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setEmergencyExit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_keeper","type":"address"}],"name":"setKeeper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_delay","type":"uint256"}],"name":"setMaxReportDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_metadataURI","type":"string"}],"name":"setMetadataURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_delay","type":"uint256"}],"name":"setMinReportDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_profitFactor","type":"uint256"}],"name":"setProfitFactor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewards","type":"address"}],"name":"setRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_targetLTVMultiplier","type":"uint16"},{"internalType":"uint16","name":"_warningLTVMultiplier","type":"uint16"},{"internalType":"uint256","name":"_acceptableCostsRay","type":"uint256"},{"internalType":"uint16","name":"_aaveReferral","type":"uint16"},{"internalType":"uint256","name":"_maxTotalBorrowIT","type":"uint256"},{"internalType":"bool","name":"_isWantIncentivised","type":"bool"},{"internalType":"bool","name":"_isInvestmentTokenIncentivised","type":"bool"},{"internalType":"bool","name":"_leaveDebtBehind","type":"bool"},{"internalType":"uint256","name":"_maxLoss","type":"uint256"}],"name":"setStrategyParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"sweep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"targetLTVMultiplier","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"callCost","type":"uint256"}],"name":"tendTrigger","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"contract VaultAPI","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"warningLTVMultiplier","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountNeeded","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"_loss","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"yVault","outputs":[{"internalType":"contract IVault","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
