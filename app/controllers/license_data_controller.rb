# app/controllers/license_data_controller.rb
require 'rtesseract'


Tesseract.configure do |config|
  config.path = '/usr/local/bin/tesseract' # Adjust the path accordingly
end
puts "Load path: #{$LOAD_PATH.join("\n")}"

class LicenseDataController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    byebug
    # Process image_data using OCR (Tesseract)
    text_data = process_image_data(params[:image_data])

    # For simplicity, assume extracted data is hardcoded
    extracted_data = {
      name: text_data['name'],
      address: text_data['address'],
      issuance_date: text_data['issuance_date'],
      expiration_date: text_data['expiration_date'],
      license_number: text_data['license_number']
    }

    # Save extracted data to the database
    @license_data = LicenseDatum.new(extracted_data)

    if @license_data.save
      render json: { status: 'success', data: @license_data }
    else
      render json: { status: 'error', errors: @license_data.errors.full_messages }
    end
  end

  def index
    # The index action is responsible for rendering the view
  end

  def capture
    # The capture action is responsible for rendering the capture page
  end

  def display
    # Retrieve existing license data for display
    @license_data = LicenseData.last
  end

  private

  def process_image_data(image_data)
    byebug
    # Convert base64 image data to binary
    binary_data = Base64.decode64(image_data['data'].split(',')[1])

    # Use Tesseract to perform OCR on the binary image data
    tesseract = RTesseract::Engine.new do |e|
      e.language = :eng
      e.path = '/usr/local/bin/tesseract' # Specify the path to your Tesseract binary
    end
    result = tesseract.from_blob(binary_data).to_s

    # Extracted text data
    text_data = result['text'] || ''

    # Parse the text data (you may need more sophisticated parsing depending on your use case)
    parsed_data = parse_text_data(text_data)

    parsed_data
  end

  def parse_text_data(text_data)
    byebug
    # Implement your own logic to extract relevant information from the OCR result
    # Example: You might use regular expressions to find patterns in the text
    # For simplicity, let's assume the OCR result is a JSON string
    JSON.parse(text_data)
  rescue JSON::ParserError => e
    Rails.logger.error("Error parsing OCR result: #{e.message}")
    {}
  end
end
