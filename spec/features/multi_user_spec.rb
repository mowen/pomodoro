feature "Multi-user synchronisation via WebSockets", js: true do

  let(:url) { "/test" }

  scenario "starts the timer when another client clicks 'start'" do
    Capybara.session_name = "Alice"
    visit url
    page.should have_content "Start"
    initial_countdown = current_countdown

    Capybara.session_name = "Bob"
    visit url
    page.should have_content "Start"
    fill_in "minutes", with: 1
    click_button "Start"
    page.should have_content "Stop"

    sleep 1

    Capybara.session_name = "Alice"
    current_countdown.should be < initial_countdown
    page.should have_content "Stop"
  end

  def current_countdown
    find("#countdown").text.sub(":", ".").to_f
  end

end
