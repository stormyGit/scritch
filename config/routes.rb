Rails.application.routes.draw do
  get '/sitemap.xml', to: redirect(Pathname.new(ENV["S3_ENDPOINT"]).join(ENV["S3_BUCKET"]).join("sitemap.xml").to_s, status: 301)

  devise_for :moderators
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  namespace :moderation do
    root to: "home#index"

    resources :home, only: [] do
      collection do
        get :analytics
      end
    end
    resources :reports do
      put :dismiss
      put :mark_as_accepted
      put :reopen
      put :assign
      put :unassign
    end
    resources :users do
      put :moderate_profile
      put :ban_and_remove_account
      put :ban_permanently
      put :ban_for_a_month
      put :ban_for_a_week
    end
    resources :comments do
    end
    resources :moderators do
    end
    resources :banned_users do
    end
  end

  telegram_webhook TelegramController

  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/s3/sign', to: "s3#sign"

  get "/videos/:id", to: "media#show", as: 'video'
  get "/videos", to: "media#index"
  get "/trending", to: "media#index"
  get "/subscriptions", to: "media#index"
  get "/:id", to: "users#show"
  get "/:id/:filter", to: "users#show"
  get "*path", to: "application#index"
  root to: "application#index"
end
