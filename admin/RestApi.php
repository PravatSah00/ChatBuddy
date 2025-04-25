<?php

class AdminRestApi {
    /**
     * Rest class constructor function
     */
    public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_rest_apis' ] );
    }

    /**
     * Register rest api
     * @return void
     */
    public function register_rest_apis() {

        register_rest_route( 'chatbuddy', '/save-graph', [
            'methods'               => \WP_REST_Server::ALLMETHODS,
            'callback'              => [ $this, 'save_graph' ],
            'permission_callback'   => [ $this, 'api_permission' ]
        ]);

        register_rest_route( 'chatbuddy', '/save-smtans', [
            'methods'               => \WP_REST_Server::ALLMETHODS,
            'callback'              => [ $this, 'save_smtans' ],
            'permission_callback'   => [ $this, 'api_permission' ]
        ]);
	}

    /**
     * ChatBuddy rest api permission functions
     * @return bool
     */
	public function api_permission() {
		return current_user_can('manage_options');
	}

    /**
     * Save graph setting
     * @param mixed $request
     * @return \WP_Error|\WP_REST_Response
     */
    public function save_graph( $request ) {
        
        $nodes  = $request->get_param( 'nodes' );
        $edges  = $request->get_param( 'edges' );

        update_option( '_decision_graph', [
            'nodes' => $nodes ?? [],
            'edges' => $edges ?? [],
        ]);

        return rest_ensure_response([ 'success' => true ]);
	}

    /**
     * Save question and answer
     * @param mixed $request
     * @return \WP_Error|\WP_REST_Response
     */
    public function save_smtans( $request ) {
        
        $smtans = $request->get_param( 'smtans' );

        update_option( '_smart_answer', $smtans );

        return rest_ensure_response([ 'success' => true ]);
	}
}