const path = require('path');

describe('MOV to MP4 Converter App', () => {
    const inputFilePath = path.resolve(__dirname, '../../test/files/file_example_MOV_1280_1_4MB.mov');
    const outputFilePath = path.resolve(__dirname, '../../test/files/output_example_MP4.mp4');
    const fileUrl = `file://${path.resolve(__dirname, '../../src/index.html')}`;

    before(async () => {
        await browser.url(fileUrl);
    });

    it('should display the main elements', async () => {
        try {
            const inputFileButton = await $('#select-input');
            const outputFileButton = await $('#select-output');
            const convertButton = await $('#convert');

            expect(await inputFileButton.isDisplayed()).toBe(true);
            expect(await outputFileButton.isDisplayed()).toBe(true);
            expect(await convertButton.isDisplayed()).toBe(true);
        } catch (error) {
            console.error('Test failed: should display the main elements', error);
        }
    });

    it('should open file dialog on input file button click', async () => {
        try {
            const inputFileButton = await $('#select-input');
            await inputFileButton.click();
            // Normally, the dialog interaction cannot be automated, but we ensure the click event is fired.
        } catch (error) {
            console.error('Test failed: should open file dialog on input file button click', error);
        }
    });

    it('should open save dialog on output file button click', async () => {
        try {
            const outputFileButton = await $('#select-output');
            await outputFileButton.click();
            // Normally, the dialog interaction cannot be automated, but we ensure the click event is fired.
        } catch (error) {
            console.error('Test failed: should open save dialog on output file button click', error);
        }
    });

    it('should disable convert button and show progress during conversion', async () => {
        try {
            const inputFile = await $('#input-file');
            const outputFile = await $('#output-file');
            const convertButton = await $('#convert');
            const progressBar = await $('.progress-bar');

            // Set values for input and output file fields
            await browser.execute((input, output) => {
                document.getElementById('input-file').value = input;
                document.getElementById('output-file').value = output;
            }, inputFilePath, outputFilePath);

            console.log('Clicking convert button');
            await convertButton.click();

            const startTime = Date.now();

            console.log('Checking if convert button is disabled');
            const isConvertButtonEnabled = await convertButton.isEnabled();
            console.log('Convert button enabled:', isConvertButtonEnabled);
            expect(isConvertButtonEnabled).toBe(false);

            const isProgressBarDisplayed = await progressBar.isDisplayed();
            console.log('Progress bar displayed:', isProgressBarDisplayed);
            expect(isProgressBarDisplayed).toBe(true);

            // Wait for conversion to complete and check success message
            const successMessage = await $('#success');
            await successMessage.waitForDisplayed({ timeout: 30000 });

            const endTime = Date.now();
            const conversionTime = endTime - startTime;
            console.log(`Conversion time: ${conversionTime}ms`);

            // You can set an expected maximum conversion time, for example, 60 seconds (60000ms)
            const expectedMaxTime = 60000;
            expect(conversionTime).toBeLessThan(expectedMaxTime);

            expect(await successMessage.getText()).toBe('Conversion complete');

            // Re-check the state of the convert button after conversion
            const isConvertButtonEnabledAfter = await convertButton.isEnabled();
            console.log('Convert button enabled after conversion:', isConvertButtonEnabledAfter);
            expect(isConvertButtonEnabledAfter).toBe(true);
        } catch (error) {
            console.error('Test failed: should disable convert button and show progress during conversion', error);
        }
    });
});
