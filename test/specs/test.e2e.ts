import { browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should not bomb out like Playwright', async () => {
        await browser.url(`https://p2p.acceptatie.pp-group.eu/`);

        await $('cap-input[data-test=\'email\'] input').setValue('administrator-cfto@pp-group.eu');
        await $('cap-input.cap-password input').setValue('WDoDc#On37HkT7n');
        await $('button[type=\'submit\']').click();

        await $('a[href="#/admin/invoices/inbox"]').waitForClickable();
        await $('a[href="#/admin/invoices/inbox"]').click();

        await $('thead.p-datatable-thead').waitForDisplayed();
        // await $('div.p-multiselect-label').waitForDisplayed();
        const dropDowners = await $$('div.p-multiselect-label');
        for(const element of dropDowners){
            if(await element.getText() === "Company"){
                await element.click()
                break
            }
        }

        const companyName = "CFTO"
        await $(`li[aria-label='${companyName}']`).click();
        await $('div.p-multiselect-footer button').click()

        for(const element of dropDowners){
            if(await element.getText() === "Status"){
                await element.click()
                break
            }
        }

        const invoiceStatus = "New";
        await $('input[role=\'textbox\']').setValue(invoiceStatus);
        await $(`li[aria-label='${invoiceStatus}']`).click();
        await $('div.p-multiselect-footer button').click()

        await $$('td[data-test="table_cell_translated_status"]')[0].waitUntil(async function () {
            // @ts-ignore
            return (await this.$('span.td-value').getText()) === 'New'
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        })

        const table = await $('tbody.p-datatable-tbody');
        await table.$$('td')[1].click()

        await $('#ledger-account .form-element').waitForDisplayed()
        await $('#ledger-account .form-element').click()
        const ledgerAccount = "21040 - TE VORDEREN BTW DIV%";
        await $('.p-dropdown-filter.p-inputtext.p-component').setValue(ledgerAccount);
        await $(`li[aria-label='${ledgerAccount}']`).waitForDisplayed();
        await $(`li[aria-label='${ledgerAccount}']`).click()


        await $('#vat .form-element').waitForDisplayed()
        await $('#vat .form-element').click()
        const VAT = "HOOG - Hoog btw tarief 21%";
        await $('.p-dropdown-filter.p-inputtext.p-component').setValue(VAT);
        await $(`li[aria-label='${VAT}']`).waitForDisplayed();
        await $(`li[aria-label='${VAT}']`).click()

        await $('cap-dropdown[formcontrolname="general_product_posting_group_id"] .form-element').waitForDisplayed()
        await $('cap-dropdown[formcontrolname="general_product_posting_group_id"] .form-element').click()
        const genProd = "Z-FINAN - Financiële boekingen";
        await $('.p-dropdown-filter.p-inputtext.p-component').setValue(genProd);
        await $(`li[aria-label='${genProd}']`).waitForDisplayed();
        await $(`li[aria-label='${genProd}']`).click()

        const amountText = await $(".cost-splitting .remaining-amount").getText();
        const splitAmountText = amountText.split(" ")[8];
        const formattedAmount = splitAmountText.replace(/\./g, "");

        await $("input.cost-splitting-input").setValue(formattedAmount)
        await $("div.invoice-head #description input").setValue("testAutomation")

        const buttons = await $$('button span.p-button-label');
        for(const element of buttons){
            if(await element.getText() === "Select workflow"){
                await element.click()
                break
            }
        };

        await $('.col.content-left.pr-5 .p-dropdown-trigger').click();
        let workflow = "testingSmartWorkflow (v6) (Approval)";
        await $(".p-dropdown-header input[type='text']").setValue(workflow);
        await $(`li[aria-label='${workflow}']`).waitForDisplayed();
        await $(`li[aria-label='${workflow}']`).click()

        await $(".invoice-workflow-steps").waitForDisplayed()
        await $(".buttons.float-right button.success").click()

        const toasterElement = await $("p-toastitem.p-element")
        await toasterElement.waitForDisplayed()
        await $("button[aria-label='Close']").click()

        const buttonsJustToBeSafe = await $$('button span.p-button-label');
        for(const element of buttonsJustToBeSafe){
            if(await element.getText() === "Continue workflow"){
                await element.waitForClickable()
                await element.click()
                break
            }
        };

        await $('a[href="#/admin/invoices/inbox"]').waitForClickable();
        await $('a[href="#/admin/invoices/list"]').waitForClickable();
        await $('a[href="#/admin/invoices/list"]').click();
    })
})

// Westbank Hoch

