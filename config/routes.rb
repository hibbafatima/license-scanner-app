# config/routes.rb

Rails.application.routes.draw do
  root 'license_data#index'

  get '/license_data/capture', to: 'license_data#capture'
  get '/license_data/display', to: 'license_data#display'

  post '/license_data/create', to: 'license_data#create'
end
