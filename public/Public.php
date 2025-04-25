<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://http://@wiiBeThere
 * @since      1.0.0
 *
 * @package    Chatbot
 * @subpackage Chatbot/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Chatbot
 * @subpackage Chatbot/public
 * @author     Pravat Sahoo <pravats459@gmail.com>
 */
class Chatbot_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		new PublicRestApi();

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Chatbot_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Chatbot_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		if (is_admin()) return;

		wp_enqueue_style( $this->plugin_name . 'public', CHATBOT_PLUGIN_DIR_URL . 'scripts/build/public/index.css', [], $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Chatbot_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Chatbot_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// Only add on frontend, not in admin
		if (is_admin()) return;

		wp_enqueue_script( $this->plugin_name, CHATBOT_PLUGIN_DIR_URL . 'scripts/build/public/index.js', [ 'react-dom', 'react-jsx-runtime', 'wp-element'], $this->version, true );

		/**
		 * Localize script data
		 */
		wp_localize_script( $this->plugin_name, 'chatbotLocalizer', apply_filters( 'chatbot_localizer', [
            'apiurl'            => untrailingslashit( get_rest_url() ),
            'nonce'             => wp_create_nonce( 'wp_rest' ),
            'decisionGraph'		=> get_option( '_decision_graph', [
				'nodes' => [],
				'edges' => [],
			]),
			'smartAnswer'		=> get_option( '_smart_answer', [] ),
        ]));

	}

	/**
	 * Register the Chatbod div.
	 * @since    1.0.0
	 */
	public function register_chatbot() {
		// Only add on frontend, not in admin
		if (is_admin()) return;

		?>
			<div id="chatbotpublic"></div>
		<?php
	}
}
