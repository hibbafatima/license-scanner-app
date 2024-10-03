class AddLicenseNumberToLicenseData < ActiveRecord::Migration[7.1]
  def change
    add_column :license_data, :license_number, :string
  end
end
