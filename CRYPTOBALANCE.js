function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CRYPTOBALANCE')
      .addItem('Refresh Balances', 'ShowHowToRefresh')
      .addSeparator()
  .addItem('Contact Info', 'ShowContactInfo')
      .addToUi();
  ui.createMenu('CRYPTOLENDING')
      .addItem('Available Lending PLateforms', 'ShowAvailableExchanges')
      .addSeparator()
      .addItem('Available Token Name', 'ShowHowAvailableTokens')
      .addSeparator()
      .addItem('Lending Side', 'ShowSides')
      .addSeparator()
      .addItem('Show Example', 'ShowExample')
      .addSeparator()
      .addItem('Contact Info', 'ShowContactInfo')
      .addToUi();
}

function ShowHowToRefresh() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Refresh Balances",
           'In your CRYPTOBALANCE function, add a 3rd argument to a locked reference cell, like A1. \nFrom now on every time you change the content of the cell A1, your data will be updated.\nExample:\n=BALANCE("BTC","35hK24tcLEWcgNA4JxpvbkNkoAcDGqQPsP","$A$1")',
            ui.ButtonSet.OK)
}
function ShowContactInfo() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Contact Info",
            'Support email: ac@charmantadvisory.com\n\
             Telegram Chat: https://t.me/TheCryptoCurious',
            ui.ButtonSet.OK)
}
function ShowAvailableExchanges() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Lending plateforms",
            'COMPOUND\n\DYDX\n\NUO',
            ui.ButtonSet.OK)
}
function ShowHowAvailableTokens() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("Available Token Name",
           'Please check the available cryptocurrencies on the lending plateform and enter their ticker. Like for Ethereum, enter ETH',
            ui.ButtonSet.OK)
}
function ShowSides() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("ShowSides",
           'APR_BORROW\n\APR_LEND',
            ui.ButtonSet.OK)
}
function ShowExample() {
  var ui = SpreadsheetApp.getUi()
  ui.alert("ShowExample",
           '=CRYPTOLENDING("COMPOUND","ETH","APR_BORROW")\n\ Gets the borrowing rate on compound for Ethereum.',
            ui.ButtonSet.OK)
}

/**CRYPTOBALANCE
 * Returns cryptocurrencies balances for the top 150 cryptocurrencies.
 *
 * @param {"CURRENCY TICKER"} The cryptocurrency TICKER/SYMBOL data to fetch, for example the symbol of Bitcoin is BTC.
 * @param {"PUBLIC WALLET ADDRESS"} associated to the cryptocurrency you want the balance from. Please pay attention, DO NOT TO ENTER your private wallet address.
 * @param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances.
 * @return The current amount of cryptocurrency on the searched public address.
 */

function CRYPTOBALANCE(ticker,address, refresh_cell){
  try{
    //

    ticker=ticker.toUpperCase();
    url="http://charmantadvisory.com/apiblock/"+ticker+"/"+address;
    var res = UrlFetchApp.fetch(url);
    var content = res.getContentText();

    return content;
  }

  catch(err){
      return "Error getting data";
  }

}
/**CRYPTOLENDING
 * Returns cryptocurrencies lending rates on different lending plateforms.
 *
 * @param {"EXCHANGE"} The exchange on which you want to retrieve the lending rate. data to fetch. Currently available exchanges: NUO, COMPOUND, DYDX.
 * @param {"TOKEN NAME"} associated to the cryptocurrency you want the lending from. Please pay attention on the available tickers on exchanges.
 * @param {"APR_BORROW or APR_LEND"} either APR_BORROW which corresponds to the borrowing rate or APR_LEND which corresponds to the lending rate.
 * @param {"EMPTY CELL REFERENCE"} refresh_cell ONLY on 3rd argument. Reference an empty cell and change its content to force refresh the balances.
 * @return the current lending rate in decimal form,  of cryptocurrency on the searched public address.
 */

function CRYPTOLENDING(exchange,ticker,side,refresh_cell){
  try{
    //

    ticker=ticker.toUpperCase();
    exchange=exchange.toUpperCase();
    side=side.toUpperCase();
    url="http://charmantadvisory.com/api/APR/"+exchange+"/"+ticker+"/"+side;
    var res = UrlFetchApp.fetch(url);
    var content = res.getContentText();

    return parseFloat(content);
  }

  catch(err){
    return "Currently available exchanges: NUO, COMPOUND, DYDX. Check fo avalable coins on exchanges if you get error. Contact: https://t.me/TheCryptoCurious for further support.";
  }

}
