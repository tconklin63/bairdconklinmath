Rails.application.routes.draw do
  get '/' => 'static_pages#home'
  get '/mathtools/primes' => 'mathtools#primes'
  get '/mathtools/factor' => 'mathtools#factor'
  get '/games/pente' => 'games#pente'
  get '/games/reversi' => 'games#reversi'
end
