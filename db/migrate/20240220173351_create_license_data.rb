class CreateLicenseData < ActiveRecord::Migration[7.1]
  def change
    create_table :license_data do |t|
      t.string :name
      t.string :address
      t.date :issuance_date
      t.date :expiration_date

      t.timestamps
    end
  end
end
