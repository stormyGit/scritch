module ModerationHelper
  def in_user_page?
    params[:action] == 'show' && params[:controller] == 'moderation/users'
  end

  def in_report_page?
    params[:action] == 'show' && params[:controller] == 'moderation/reports'
  end

  def in_picture_page?
    params[:action] == 'show' && params[:controller] == 'moderation/pictures'
  end

  def format_text(text)
    auto_link(simple_format(h(text)), :html => { :target => '_blank', :rel => 'noopener', class: 'ellipsis' }).gsub("\n\n", '<br />').gsub("<p></p>", '').html_safe
  end

  def moderator_can_see?(capability)
    current_moderator.capabilities.include?(capability)
  end
end
