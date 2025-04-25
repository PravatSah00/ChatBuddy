<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://http://@wiiBeThere
 * @since             1.0.0
 * @package           ChatBuddy
 *
 * @wordpress-plugin
 * Plugin Name:       ChatBuddy
 * Plugin URI:        https://http://@wiiBeThere
 * Description:       Plugin Short Description Will Be Here
 * Version:           1.0.0
 * Author:            Pageoptima
 * Author URI:        https://http://@wiiBeThere/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       chatbot
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'CHATBOT_VERSION', '1.0.0' );
define( 'CHATBOT_PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-chatbot-activator.php
 */
function activate_chatbot() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/Activator.php';
	Chatbot_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-chatbot-deactivator.php
 */
function deactivate_chatbot() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/Deactivator.php';
	Chatbot_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_chatbot' );
register_deactivation_hook( __FILE__, 'deactivate_chatbot' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/Chatbot.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_chatbot() {

	$plugin = new Chatbot();
	$plugin->run();

}

run_chatbot();
