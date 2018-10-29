Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/s3/sign', to: "s3#sign"

  get "/videos/:id", to: "media#show"
  get "/videos", to: "media#index"
  get "/trending", to: "media#index"
  get "/subscriptions", to: "media#index"
  get "/:id", to: "users#show"
  get "/:id/:filter", to: "users#show"
  get "*path", to: "application#index"
  root to: "application#index"
end
