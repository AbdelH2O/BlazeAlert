# Set the minimum CMake version and the project name
cmake_minimum_required(VERSION 3.5)

# Include the ESP-IDF build system
include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(esp32_project)

# Specify the main source file
set(SOURCES main.cpp)

# Add the executable using the specified sources
idf_component_register(SRCS ${SOURCES} INCLUDE_DIRS .)
