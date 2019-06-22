Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  get 'sponsors/cancel', :to => "sponsors#cancel"
  put 'sponsors/end_sponsorship', :to => "sponsors#end_sponsorship"
  get 'sponsors/free_trial', :to => "sponsors#free_trial"
  get 'sponsors/:sponsor_id/end_sponsorship', :to => "sponsors#end_sponsorship"
  post 'sponsors/charge', :to => "sponsors#charge"
  post 'adverts/charge', :to => "adverts#charge"
  get 'adverts/:id/go_to', :to => "adverts#go_to"
  resources :sponsors
  resources :adverts
  post 'adverts/refill', :to => "adverts#refill"
  get '/sitemap.xml', to: redirect(Pathname.new(ENV["S3_ENDPOINT"]).join(ENV["S3_BUCKET"]).join("sitemap.xml").to_s, status: 301)


  get '/403', :to => "errors#403"
  get '/404', :to => "errors#404"
  get '/422', :to => "errors#422"
  get '/500', :to => "errors#500"

  devise_for :moderators
  # devise_for :admin_users, ActiveAdmin::Devise.config
  # ActiveAdmin.routes(self)
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

    resources :tech_reports do
    end
    resources :announcements do
    end

    resources :reports do
      put :dismiss
      put :mark_as_accepted
      put :reopen
      put :assign
      put :unassign
    end
    resources :medium_reports do
      put :dismiss
      put :mark_as_accepted
      put :reopen
      put :assign
      put :unassign
    end
    resources :comment_reports do
      put :dismiss
      put :mark_as_accepted
      put :reopen
      put :assign
      put :unassign
    end
    resources :asset_requests do
      put :dismiss
      put :mark_as_accepted
      put :reopen
      put :assign
      put :unassign
    end
    resources :fursuit_requests do
      put :dismiss
      put :mark_as_accepted
      put :reopen
      put :assign
      put :unassign
    end
    resources :tag_reports do
      put :dismiss
      put :mark_as_accepted
      put :reopen
      put :assign
      put :unassign
    end
    resources :users do
      put :moderate_profile
      put :minor_tag_violation
      put :serious_tag_violation
      put :minor_user_violation
      put :serious_user_violation
      put :minor_comment_violation
      put :serious_comment_violation
      put :harmless_medium_violation
      put :minor_medium_violation
      put :serious_medium_violation
      put :minor_comment_violation
      put :serious_comment_violation
      put :not_worth_report
    end
    resources :makers
    resources :fursuits
    resources :events do
      resources :editions
    end
    resources :comments do
    end
    resources :claims do
    end
    resources :tooltips do
    end
    resources :maker_claims do
    end
    resources :sponsors do
    end
    resources :adverts do
      put :toggle_off
      put :approve
      put :reject
    end
    resources :moderators do
    end
    resources :statistics do
    end
    resources :suspended_users do
    end
  end

  telegram_webhook TelegramController, :default
  telegram_webhook TelegramController, :login
  telegram_webhook TelegramController, :admin

  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/s3/sign', to: "s3#sign"

  get "/pictures/:id", to: "media#show", as: 'video'
  get "/pictures", to: "media#index"
  get "/fursuits/:id", to: "fursuits#index"
  get "/makers/:id", to: "makers#index"
  get "/events/:id", to: "makers#index"
  get "/fursuits", to: "fursuits#index"
  get "/makers", to: "makers#index"
  get "/events", to: "events#index"
  get "/ads", to: "events#index"
  get "/favorites", to: "media#index"
  get "/tag", to: "media#index"
  get "/search", to: "media#index"
  get "/subscriptions", to: "media#index"

  get "/terms_of_use", to: "media#index"
  get "/user_guide", to: "media#index"
  get "/faq", to: "media#index"
  get "/privacy_policy", to: "media#index"
  get "/announcements", to: "media#index"

  get "/:id", to: "users#show"
  get "/:id/:filter", to: "users#show"
  get "/moderation", to: "moderation#index"
  get "*path", to: "application#index"
  root to: "application#index"
end
